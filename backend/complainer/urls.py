from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView, RedirectView
from rest_framework.routers import DefaultRouter
from core.views import ComplaintViewSet
from authentication.views import UserViewSet, ObtainJWTTokenView

router = DefaultRouter()

router.register("complaints", ComplaintViewSet)
router.register("users", UserViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/login/", ObtainJWTTokenView.as_view()),
    path("api/", include(router.urls)),
    # path("", TemplateView.as_view(template_name="index.html")),
    # re_path(r"^(?P<path>.*)/$", TemplateView.as_view(template_name="index.html")),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
