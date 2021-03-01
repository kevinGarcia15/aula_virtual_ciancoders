from .user import (UserSerializer, UserReadSerializer, 
        ProfileSerializer, ProfileAndUserSerializer,
        CreateProfileSerializer, TokenProfileSerializer,
        ActualizarProfileSerializer
)
from .maestro import MaestroSerializer, CrearMaestroSerializer, ActualizarMaestroSerializer
from .estudiante import EstudianteSerializer,EstudianteCrearSerializer
from .profesion import ProfesionSerializer
from .nivel import NivelSerializer
from .asignacion import AsignacionSerializer,AsignacionTareaSerializer
from .evento import EventoSerializer, EventoReadSerializer
from .tarea import TareaSerializer
from .grado import GradoSerializer, GradoReadSerializer
from .seccion import SeccionSerializer, SeccionReadSerializer
from .curso import CursoSerializer, CursoReadSerializer