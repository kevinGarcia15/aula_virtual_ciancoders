from .user import (UserSerializer, UserReadSerializer, 
        ProfileSerializer, ProfileAndUserSerializer,
        CreateProfileSerializer, TokenProfileSerializer,
        ActualizarProfileSerializer
)
from .maestro import MaestroSerializer, CrearMaestroSerializer, ActualizarMaestroSerializer
from .estudiante import EstudianteSerializer,EstudianteCrearSerializer
from .profesion import ProfesionSerializer
from .nivel import NivelSerializer
from .asignacion import AsignacionSerializer,AsignacionTareaSerializer, AsignacionCrearSerializer
from .evento import EventoSerializer, EventoReadSerializer
from .tarea import TareaSerializer, TareaReadSerializer
from .grado import GradoSerializer, GradoReadSerializer
from .seccion import SeccionSerializer, SeccionReadSerializer
from .curso import CursoSerializer, CursoReadSerializer
from .ciclo import CicloReadSerializer, CicloSerializer
from .material import MaterialSerializer, MaterialReadSerializer
from .tarea_estudiante import TareaEstudianteSerializer, TareaEstudianteReadSerializer, TareaEstudianteMisNotasSerializer