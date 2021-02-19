from .user import (UserSerializer, UserReadSerializer, 
        ProfileSerializer, ProfileAndUserSerializer,
        CreateProfileSerializer, TokenProfileSerializer
)
from .maestro import MaestroSerializer, CrearMaestroSerializer
from .estudiante import EstudianteSerializer,EstudianteCrearSerializer
from .profesion import ProfesionSerializer
from .nivel import NivelSerializer
from .asignacion import AsignacionSerializer,AsignacionTareaSerializer
from .evento import EventoSerializer
from .tarea import TareaSerializer