from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import RecorderSerializer, ListRecorderSerializer, DeleteAudioFileSerializer, VocabularySerializer
from .models import recorder
import pandas as pd
import tempfile
import nltk
import os

from django.contrib.auth import get_user_model
from .models import vocabulary

User = get_user_model()

# nltk.download('punkt')

df = pd.read_csv(r"D:/Majorproject/speech-assesment/backend/recorder/idiomsfinal.csv")
# script_dir = os.getcwd()
# file = 'idiomsfinal.csv'
# df = pd.read_csv(os.path.normcase(os.path.join(script_dir, file)))
df['Idiom'] = df['Idiom'].str.lower()
df = df.drop_duplicates(subset=['Idiom'])
idiomlist = df['Idiom'].tolist()

# Use a pipeline as a high-level helper
from transformers import pipeline
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
local_model_path = "./recorder/t5-grammar-model"
GEC_pipe = AutoModelForSeq2SeqLM.from_pretrained(local_model_path)
tokenizer = AutoTokenizer.from_pretrained(local_model_path)

whisper_model_path = "./recorder/whisper-small.en"
pipe = pipeline("automatic-speech-recognition", model=whisper_model_path)
classifier = pipeline("text-classification", model="kalobiralo/bert_cefr_model2")
# pipe = pipeline("text2text-generation",model=GEC_pipe, tokenizer=tokenizer)



# Create your views here.
@api_view(['POST'])
def create_recorder(request):
    if request.method == 'POST':
        # Check if the 'audio' file is present in the request
        if 'audio' not in request.FILES:
            return Response({'error': 'No audio file was submitted.'}, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve the audio file and name from the request
        audio_file = request.FILES['audio']
        email = request.data.get('email')
        user = User.objects.get(email=email)
        
        # Save the audio file temporarily
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temp_audio_file:
            temp_audio_path = temp_audio_file.name
            for chunk in audio_file.chunks():
                temp_audio_file.write(chunk)
        # Transcribe audio using ASR pipeline
        try:
            transcribe_result = pipe(temp_audio_path)
            transcribed_text = transcribe_result['text']
            print(transcribe_result['text'])
            
        except Exception as e:
            os.remove(temp_audio_path)  # Remove the temporary audio file
            return Response({'error': f'Error transcribing audio: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # Remove the temporary audio file
        os.remove(temp_audio_path)
        corrected_sentence = grammar_correction(transcribe_result['text'])
        print(corrected_sentence)
        
    #     print("User columns:")
    # for field in user._meta.fields:
    #     print(f"{field.name}: {getattr(user, field.name)}")
        # Create a new Recorder instance and set the audio file
        serializer = RecorderSerializer(data={'user': user.id,'audio_file': audio_file, 'transcribed_text':transcribed_text, 'corrected_sentence':corrected_sentence})
        if serializer.is_valid():
            serializer.save() 
            wordlist,unique_wordlist,A1_list,A2_list,B1_list,B2_list,C1_list,C2_list,extracted_idioms = extract_lists(transcribe_result['text'], idiomlist,email)
            data_to_send = {
                'wordlist': wordlist,
                'unique_wordlist': list(unique_wordlist),
                'A1_list': A1_list,
                'A2_list': A2_list,
                'B1_list': B1_list,
                'B2_list': B2_list,
                'C1_list': C1_list,
                'C2_list': C2_list,
                'extracted_idioms': extracted_idioms
            }
            print(data_to_send)
            print(f"serializer output {serializer.data}")
            return Response({**serializer.data,**data_to_send}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    


@api_view(['GET'])
def recorder_list(request,id):
    if request.method == 'GET':
        
        # recorders = recorder.objects.all()
        # Fetch the latest recording based on timestamp
        # recorders = recorder.objects.order_by('-dateTime')
        
        # if not recorders:
        #     return Response([], status=status.HTTP_200_OK)
        # serializer = ListRecorderSerializer(recorders, many=True)
        # return Response(serializer.data, status=status.HTTP_200_OK)
       
        try:
            print(id)
            recorders = recorder.objects.get(id=id)
            serializer = ListRecorderSerializer(recorders)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except vocabulary.DoesNotExist:
            return Response({"message": "Recording data not found for the given recording ID "}, status=404)


@api_view(['DELETE'])
def delete_audio_file(request):
    if request.method == 'DELETE':
        serializer = DeleteAudioFileSerializer(data=request.data)
        if serializer.is_valid():
            pk = serializer.validated_data['pk']
            try:
                recorder_instance = recorder.objects.get(pk=pk)
            except recorder.DoesNotExist:
                return Response("Recorder instance does not exist.", status=status.HTTP_404_NOT_FOUND)
            
            recorder_instance.audio_file.delete()  # Delete the audio file from storage
            return Response("Audio file deleted successfully.", status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
def grammar_correction(transcribed_text):
    sentencelist = []
    correctlist = []
    sentences = transcribed_text.split('. ')
    for sentence in sentences:
        if sentence!=sentences[-1]:
            formatted_sentence = sentence.strip() + '.'
            sentencelist.append(formatted_sentence)
        else:
            sentencelist.append(sentence)
    print(sentencelist)
    print("hello1")

    for sentence in sentencelist:
        inputs =tokenizer(sentence, max_length=128, truncation=True, return_tensors="pt")
        output = GEC_pipe.generate(**inputs, num_beams=8, do_sample=True, max_length=128)
        decoded_output = tokenizer.batch_decode(output, skip_special_tokens=True)[0]
        corrected_sentence = nltk.sent_tokenize(decoded_output.strip())[0]
        print(corrected_sentence)
        print('hello3')
        correctsentence=corrected_sentence
        correctlist.append(correctsentence)
        print(correctsentence)
        print(" ~")

    print(correctlist)
    print("hello4")
    GEC_sentence = ' '.join(correctlist)
    
    return GEC_sentence


# Model for vocabulary evaluation
def extract_lists(text, idioms, email):
    extracted_idioms = []
    cleaned_text = text.lower()

    for idiom in idioms:
      if idiom in cleaned_text:
        extracted_idioms.append(idiom)
        cleaned_text = cleaned_text.replace(idiom, '')

    # initializing punctuations string
    punc = '''!()-[]{};:"\,<>./?@#$%^&*_~'''

    # Removing punctuations in string
    # Using loop + punctuation string
    for ele in cleaned_text:
      if ele in punc:
        cleaned_text = cleaned_text.replace(ele, "")

    wordlist = cleaned_text.split()
    unique_wordlist = set(wordlist)

    A1_list=[]
    A2_list=[]
    B1_list=[]
    B2_list=[]
    C1_list=[]
    C2_list=[]

    for word in unique_wordlist:
      predictions = classifier(word)
      cefr = predictions[0]['label']

      if cefr == 'A1':
        A1_list.append(word)
      elif cefr == 'A2':
        A2_list.append(word)
      elif cefr == 'B1':
        B1_list.append(word)
      elif cefr == 'B2':
        B2_list.append(word)
      elif cefr == 'C1':
        C1_list.append(word)
      else:
        C2_list.append(word)
    
    
   
    user = User.objects.get(email=email)
    recording = recorder.objects.latest('dateTime')


    # Create a vocabulary object and save it to the database

    # serializer = RecorderSerializer(data={
    #    'user': user.id,
    #    'recording': recording.id, 
    #    'wordlist':wordlist, 
    #    'unique_wordlist':unique_wordlist, 
    #    'extracted_idioms':extracted_idioms, 
    #    'a1_list':A1_list, 
    #    'a2_list':A2_list, 
    #    'b1_list':B1_list, 
    #    'b2_list':B2_list, 
    #    'c1_list':C1_list, 
    #    'c2_list':C2_list,})
    
    # if serializer.is_valid():
    #     serializer.save() 

    vocab_entry = vocabulary.objects.create(
        user=user,
        recording=recording,
        wordlist=', '.join(wordlist),
        unique_wordlist=','.join(unique_wordlist),
        extracted_idioms=', '.join(extracted_idioms),
        a1_list=', '.join(A1_list),
        a2_list=', '.join(A2_list),
        b1_list=', '.join(B1_list),
        b2_list=', '.join(B2_list),
        c1_list=', '.join(C1_list),
        c2_list=', '.join(C2_list)
    )           

    vocab_entry.save()
    # Save the vocabulary entry
    #     return Response(serializer.data, status=status.HTTP_201_CREATED)
    # else:
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
        

    return wordlist,unique_wordlist,A1_list,A2_list,B1_list,B2_list,C1_list,C2_list,extracted_idioms



@api_view(['GET'])
def get_vocab(request, id):
    try:
        print(id)
        vocab_data = vocabulary.objects.get(recording_id=id)
        serializer = VocabularySerializer(vocab_data)
        return Response(serializer.data)
    except vocabulary.DoesNotExist:
        return Response({"message": "Vocabulary data not found for the given recording ID "}, status=404)

@api_view(['GET'])
def get_all_result(request, email):
    try:
        user = User.objects.get(email=email)
        text_data = recorder.objects.filter(user=user).order_by('-dateTime')
        # print(text_data)
        serializer = ListRecorderSerializer(text_data, many=True)
        return Response(serializer.data)
    except vocabulary.DoesNotExist:
        return Response({"message": "Vocabulary data not found for the given recording ID."}, status=404)