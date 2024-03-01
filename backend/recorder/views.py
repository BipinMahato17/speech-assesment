from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import RecorderSerializer, ListRecorderSerializer, DeleteAudioFileSerializer
from .models import recorder

# Create your views here.
@api_view(['POST'])
def create_recorder(request):
    if request.method == 'POST':
        serializer = RecorderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
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
    