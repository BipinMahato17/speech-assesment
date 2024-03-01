from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import RecorderSerializer, ListRecorderSerializer, DeleteAudioFileSerializer
from .models import recorder
# Use a pipeline as a high-level helper

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

        # Create a new Recorder instance and set the audio file
        serializer = RecorderSerializer(data={'name': name,'audio_file': audio_file})
        if serializer.is_valid():
            serializer.save() 

            # You can perform additional processing here, such as transcription
            # transcribed_text = transcribe_audio(audio_file)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def recorder_list(request):
    if request.method == 'GET':
        recorders = recorder.objects.all()
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
    