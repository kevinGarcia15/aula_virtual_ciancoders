from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls import url
from api import viewsets


router = DefaultRouter()
router.register(r'user', viewsets.UserViewset)
router.register(r'maestro', viewsets.MaestroViewset)
router.register(r'estudiante', viewsets.EstudianteViewset)
router.register(r'profesion', viewsets.ProfesionViewset)
router.register(r'admin', viewsets.AdminViewset)
router.register(r'niveles', viewsets.NivelViewset)
router.register(r'evento', viewsets.EventoViewset)
router.register(r'grados', viewsets.GradoViewset)
router.register(r'secciones', viewsets.SeccionViewset)
router.register(r'cursos', viewsets.CursoViewset)
router.register(r'ciclos', viewsets.CicloViewset)
router.register(r'asignaciones', viewsets.AsignacionViewset)
router.register(r'tareas', viewsets.TareaViewset)
router.register(r'materiales', viewsets.MaterialViewset)
urlpatterns = [
    path('api/', include(router.urls)),
    url(r"^api/token", obtain_auth_token, name="api-token"),
    path('api-auth/', include('rest_framework.urls')),
]
