from enum import Enum


# An Enum for possible user occupations
class Occupation(str, Enum):
    Student = "Student"
    Freelancer = "Freelancer"
    Developer = "Developer"
    Designer = "Designer"
    Other = "Other"