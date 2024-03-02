from rest_framework import serializers
from .models import recorder
# from transformers import pipeline


class RecorderSerializer(serializers.ModelSerializer):
    class Meta:
        model = recorder
        fields = ['id', 'name', 'audio_file', 'dateTime', 'transcribed_text']
        

    def create(self, validated_data):
        print("inside the serializer.py")
        return recorder.objects.create(
            name=validated_data['name'],
            audio_file=validated_data['audio_file'],
            transcribed_text=validated_data['transcribed_text']
        )


    
class DeleteAudioFileSerializer(serializers.Serializer):
    pk = serializers.IntegerField()

    def validate_pk(self, value):
        try:
            recorder_instance = recorder.objects.get(pk=value)
        except recorder.DoesNotExist:
            raise serializers.ValidationError("Recorder instance does not exist.")
        return value

class ListRecorderSerializer(serializers.ModelSerializer):
    class Meta:
        model = recorder
        fields = "__all__"