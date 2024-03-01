from rest_framework import serializers
from .models import recorder

class RecorderSerializer(serializers.ModelSerializer):
    class Meta:
        model = recorder
        fields = "__all__"

    def create(self, validated_data):
        audio_file = validated_data.pop('audio_file')
        recorder_instance = recorder.objects.create(audio_file=audio_file, **validated_data)
        return recorder_instance
    
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