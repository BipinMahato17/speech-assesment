from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import RecorderSerializer, ListRecorderSerializer, DeleteAudioFileSerializer
from .models import recorder

import tempfile
import os
# Use a pipeline as a high-level helper
from transformers import pipeline
pipe = pipeline("automatic-speech-recognition", model="openai/whisper-small.en")

GEC_pipe = pipeline("text2text-generation", model="kalobiralo/t5-grammar269k-model")

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
        # Create a new Recorder instance and set the audio file
        serializer = RecorderSerializer(data={'name': name,'audio_file': audio_file, 'transcribed_text':transcribed_text, 'corrected_sentence':corrected_sentence})
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
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
    print("entered grammar corection function/////////////////")
    corrected_sentence = GEC_pipe(transcribed_text)
    GEC_sentence=corrected_sentence[0]['generated_text']
    # print(GEC_sentence)
    return GEC_sentence