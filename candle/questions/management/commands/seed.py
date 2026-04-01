from django.core.management.base import BaseCommand
from questions.models import Result, Category, Res_Cat_Associations, Type, Type_Cat_Associations, Question

class Command(BaseCommand):
    help = 'Seed the database with initial data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding database...')

        # Results
        cynicism = Result.objects.get_or_create(
            name="Cynicism"
        )[0]
        cynicism.save()

        exhaustion = Result.objects.get_or_create(
            name="Exhaustion"
        )[0]
        exhaustion.save()

        reduced_accomplishment = Result.objects.get_or_create(
            name="Reduced Accomplishment"
        )[0]
        reduced_accomplishment.save()



        # Categories & Associations
        possibility_of_development = Category.objects.get_or_create(
            name="Possibility of Development"
        )[0]
        possibility_of_development.save()
        Res_Cat_Associations.objects.get_or_create(
            category=possibility_of_development,
            result=cynicism,
            correlation=-0.691
        )
        Res_Cat_Associations.objects.get_or_create(
            category=possibility_of_development,
            result=reduced_accomplishment,
            correlation=-.403
        )
        Res_Cat_Associations.objects.get_or_create(
            category=possibility_of_development,
            result=exhaustion,
            correlation=-.303
        )

        feedback = Category.objects.get_or_create(
            name="Feedback"
        )[0]
        feedback.save()
        Res_Cat_Associations.objects.get_or_create(
            category=feedback,
            result=reduced_accomplishment,
            correlation=-.257
        )

        emotional_demands = Category.objects.get_or_create(
            name="Emotional_Demands"
        )[0]
        emotional_demands.save()
        Res_Cat_Associations.objects.get_or_create(
            category=emotional_demands,
            result=cynicism,
            correlation=0.347
        )
        Res_Cat_Associations.objects.get_or_create(
            category=emotional_demands,
            result=reduced_accomplishment,
            correlation=0.251
        )
        Res_Cat_Associations.objects.get_or_create(
            category=emotional_demands,
            result=exhaustion,
            correlation=0.301
        )

        career_choice_anxiety = Category.objects.get_or_create(
            name="Career Choice Anxiety"
        )[0]
        career_choice_anxiety.save()
        Res_Cat_Associations.objects.get_or_create(
            category=career_choice_anxiety,
            result=cynicism,
            correlation=0.099
        )

        work_style_demands = Category.objects.get_or_create(
            name="Works Style Demands"
        )[0]
        work_style_demands.save()
        Res_Cat_Associations.objects.get_or_create(
            category=work_style_demands,
            result=reduced_accomplishment,
            correlation=0.378
        )

        conflicts_with_lecturers = Category.objects.get_or_create(
            name="Conflicts With Lecturers"
        )[0]
        conflicts_with_lecturers.save()
        Res_Cat_Associations.objects.get_or_create(
            category=conflicts_with_lecturers,
            result=reduced_accomplishment,
            correlation=0.134
        )

        mental_demands = Category.objects.get_or_create(
            name="Mental Demands"
        )[0]
        mental_demands.save()
        Res_Cat_Associations.objects.get_or_create(
            category=mental_demands,
            result=reduced_accomplishment,
            correlation=0.266
        )
        Res_Cat_Associations.objects.get_or_create(
            category=mental_demands,
            result=exhaustion,
            correlation=0.363
        )


        # Question Types & Associations
        # categories = Category.objects.filter(res_cat_associations__result=cynicism)

        # print(categories)

        includes_cyn = Type.objects.get_or_create(
            type="Includes Cynicism"
        )[0]
        for cat in Category.objects.filter(res_cat_associations__result=cynicism):
            Type_Cat_Associations.objects.get_or_create(
                type = includes_cyn,
                category = cat
            )

        includes_acc = Type.objects.get_or_create(
            type="Includes Redcued Accomplishment"
        )[0]
        for cat in Category.objects.filter(res_cat_associations__result=reduced_accomplishment):
            Type_Cat_Associations.objects.get_or_create(
                type = includes_acc,
                category = cat
            )

        includes_exh = Type.objects.get_or_create(
            type="Includes Exhaustion"
        )[0]
        for cat in Category.objects.filter(res_cat_associations__result=exhaustion):
            Type_Cat_Associations.objects.get_or_create(
                type = includes_exh,
                category = cat
            )

        general_1 = Type.objects.get_or_create(
            type="General Question 1"
        )[0]
        for cat in Category.objects.filter():
            Type_Cat_Associations.objects.get_or_create(
                type = general_1,
                category = cat
            )

        general_2 = Type.objects.get_or_create(
            type="General Question 2"
        )[0]
        for cat in Category.objects.filter():
            Type_Cat_Associations.objects.get_or_create(
                type = general_2,
                category = cat
            )


        #Questions

        # Possibility of Development
        Question.objects.get_or_create(
            category=possibility_of_development,
            text="I feel that my university studies help me grow personally and academically."
        )
        Question.objects.get_or_create(
            category=possibility_of_development,
            text="I have meaningful opportunities to improve my skills through my coursework."
        )
        Question.objects.get_or_create(
            category=possibility_of_development,
            text="What I learn in my classes feels useful for my future career."
        )
        Question.objects.get_or_create(
            category=possibility_of_development,
            text="I feel like I am making progress toward becoming more competent in my field."
        )

        # Feedback
        Question.objects.get_or_create(
            category=feedback,
            text="The feedback I receive from instructors helps me improve my performance."
        )
        Question.objects.get_or_create(
            category=feedback,
            text="I receive clear explanations about how to improve after assignments or exams."
        )
        Question.objects.get_or_create(
            category=feedback,
            text="Feedback from my lecturers is specific and useful."
        )
        Question.objects.get_or_create(
            category=feedback,
            text="I rarely feel unsure about how well I am doing in my courses."
        )

        # Emotional Demands
        Question.objects.get_or_create(
            category=emotional_demands,
            text="I worry frequently about my academic performance or grades."
        )
        Question.objects.get_or_create(
            category=emotional_demands,
            text="My studies make me feel emotionally drained."
        )
        Question.objects.get_or_create(
            category=emotional_demands,
            text="I feel anxious about meeting academic expectations."
        )
        Question.objects.get_or_create(
            category=emotional_demands,
            text="I often feel overwhelmed by the emotional pressure of my coursework."
        )

        # Career Choice Anxiety
        Question.objects.get_or_create(
            category=career_choice_anxiety,
            text="I feel uncertain about what career path to pursue after graduation."
        )
        Question.objects.get_or_create(
            category=career_choice_anxiety,
            text="I worry that my studies may not lead to a satisfying career."
        )
        Question.objects.get_or_create(
            category=career_choice_anxiety,
            text="I feel stressed about making the right career decision."
        )
        Question.objects.get_or_create(
            category=career_choice_anxiety,
            text="I sometimes question whether I chose the right major or program."
        )

        # Work Style Demands
        Question.objects.get_or_create(
            category=work_style_demands,
            text="I feel like I do not have enough time to complete my academic tasks."
        )
        Question.objects.get_or_create(
            category=work_style_demands,
            text="My workload requires me to study for long hours regularly."
        )
        Question.objects.get_or_create(
            category=work_style_demands,
            text="The number of assignments and exams feels overwhelming."
        )
        Question.objects.get_or_create(
            category=work_style_demands,
            text="I struggle to keep up with the pace of my courses."
        )

        # Conflicts With Lecturers
        Question.objects.get_or_create(
            category=conflicts_with_lecturers,
            text="I feel that some lecturers treat students unfairly."
        )
        Question.objects.get_or_create(
            category=conflicts_with_lecturers,
            text="I have experienced conflict or tension with instructors."
        )
        Question.objects.get_or_create(
            category=conflicts_with_lecturers,
            text="I feel uncomfortable approaching certain lecturers for help."
        )
        Question.objects.get_or_create(
            category=conflicts_with_lecturers,
            text="I feel that my concerns are not taken seriously by some instructors."
        )

        # Mental Demands
        Question.objects.get_or_create(
            category=mental_demands,
            text="My coursework requires intense concentration for long periods."
        )
        Question.objects.get_or_create(
            category=mental_demands,
            text="Exams leave me mentally exhausted."
        )
        Question.objects.get_or_create(
            category=mental_demands,
            text="I find my academic tasks cognitively demanding."
        )
        Question.objects.get_or_create(
            category=mental_demands,
            text="I often feel mentally drained after studying."
        )



        self.stdout.write(self.style.SUCCESS('Done seeding'))