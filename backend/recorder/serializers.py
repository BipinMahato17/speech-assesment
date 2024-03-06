from rest_framework import serializers
from .models import recorder, vocabulary
# from transformers import pipeline


class RecorderSerializer(serializers.ModelSerializer):
    class Meta:
        model = recorder
        fields = ['id', 'user', 'audio_file', 'dateTime', 'transcribed_text', 'corrected_sentence']
        

    def create(self, validated_data):
        print("inside the vocab serializer.py")
        # Retrieve the user from the validated data
        user = validated_data.get('user')

        # Create and return the recorder instance
        return recorder.objects.create(
            user=user,
            audio_file=validated_data['audio_file'],
            transcribed_text=validated_data['transcribed_text'],
            corrected_sentence=validated_data['corrected_sentence'],
        )

class VocabularySerializer(serializers.ModelSerializer):
    class Meta:
        model = vocabulary
        fields = "__all__"
        

    # def create(self, validated_data):
    #     print("inside the vocab serializer.py")
    #     # Retrieve the user from the validated data
    #     user = validated_data.get('user')

    #     # Create and return the recorder instance
    #     return recorder.objects.create(
    #         user=user,
    #         audio_file=validated_data['audio_file'],
    #         transcribed_text=validated_data['transcribed_text'],
    #         corrected_sentence=validated_data['corrected_sentence'],
    #     )

# class LearningSerializer(serializers.ModelSerializer):
#     transcribed_text = serializers.CharField(source='recording.transcribed_text', read_only=True)

#     class Meta:
#         model = vocabulary
#         fields = ['id', '']
    
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