from enum import Enum


class Occupation(str, Enum):
    Student = "Student"
    Freelancer = "Freelancer"
    Developer = "Developer"
    Designer = "Designer"
    Other = "Other"