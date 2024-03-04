
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import RecorderSerializer, ListRecorderSerializer, DeleteAudioFileSerializer
from .models import recorder
import pandas as pd
import tempfile
import nltk
import os
nltk.download('punkt')

df = pd.read_csv(r"D:\Majorproject\speech-assesment\backend\recorder\idiomsfinal.csv")
# script_dir = os.getcwd()
# file = 'idiomsfinal.csv'
# df = pd.read_csv(os.path.normcase(os.path.join(script_dir, file)))
df['Idiom'] = df['Idiom'].str.lower()
df = df.drop_duplicates(subset=['Idiom'])
idiomlist = df['Idiom'].tolist()

# Use a pipeline as a high-level helper
from transformers import pipeline
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
pipe = pipeline("automatic-speech-recognition", model="openai/whisper-small.en")
classifier = pipeline("text-classification", model="kalobiralo/bert_cefr_model2")
tokenizer = AutoTokenizer.from_pretrained("kalobiralo/t5-grammar-model")
GEC_pipe = AutoModelForSeq2SeqLM.from_pretrained("kalobiralo/t5-grammar-model")

# Create your views here.
@api_view(['POST'])
def create_recorder(request):
    if request.method == 'POST':
        # Check if the 'audio' file is present in the request
        if 'audio' not in request.FILES:
            return Response({'error': 'No audio file was submitted.'}, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve the audio file and name from the request
        audio_file = request.FILES['audio']
        name = request.data.get('name')
        
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
        wordlist,unique_wordlist,A1_list,A2_list,B1_list,B2_list,C1_list,C2_list,extracted_idioms = extract_lists(transcribe_result['text'], idiomlist)
        
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
        # Create a new Recorder instance and set the audio file
        serializer = RecorderSerializer(data={'name': name,'audio_file': audio_file, 'transcribed_text':transcribed_text, 'corrected_sentence':corrected_sentence})
        if serializer.is_valid():
            serializer.save() 
            return Response({**serializer.data,**data_to_send}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['GET'])
def recorder_list(request):
    if request.method == 'GET':
        # recorders = recorder.objects.all()
        # Fetch the latest recording based on timestamp
        recorders = recorder.objects.order_by('-dateTime')
        
        if not recorders:
            return Response([], status=status.HTTP_200_OK)
        serializer = ListRecorderSerializer(recorders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


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
def extract_lists(text, idioms):
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

    return wordlist,unique_wordlist,A1_list,A2_list,B1_list,B2_list,C1_list,C2_list,extracted_idioms