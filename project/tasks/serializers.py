from rest_framework import serializers
from tasks.models import Category, Task

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields='__all__'
        read_only_fields=['created_by']

class TaskSerializer(serializers.ModelSerializer):
    category_name=serializers.CharField(source='category.name',read_only=True)
    category_color=serializers.CharField(source='category.color',read_only=True)

    class Meta:
        model=Task
        fields='__all__'
        read_only_fields=['created_by']

class DashboardTaskCompletionSerializer(serializers.ModelSerializer):
    count=serializers.IntegerField()
    class Meta:
        model=Task
        fields=['completed','count']

class DashboardTaskByCategorySerializer(serializers.ModelSerializer):
    count=serializers.IntegerField()
    class Meta:
        model=Category
        fields=('id','name','color','count')