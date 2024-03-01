from rest_framework import serializers
from .models import recorder
from transformers import pipeline


class RecorderSerializer(serializers.ModelSerializer):
    class Meta:
        model = recorder
        fields = "__all__"

    def create(self, validated_data):
        print("inside the serializer.py")
        return recorder.objects.create(
            name=validated_data['name'],
            audio_file=validated_data['audio_file']
        )
        # audio_file = validated_data.pop('audio_file')
        # name = validated_data['name']
        # # transcription = self.transcribe_audio(audio_file)
        # recorder_instance = recorder.objects.create(name = name, audio_file=audio_file, **validated_data)
        # return recorder_instance
    
    # def transcribe_audio(self, audio_data):
    #     # Load the automatic speech recognition pipeline
    #     asr_pipeline = pipeline("automatic-speech-recognition", model="openai/whisper-base.en")

    #     # Transcribe the audio
    #     transcription = asr_pipeline(audio_data)

    #     return transcription
    
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