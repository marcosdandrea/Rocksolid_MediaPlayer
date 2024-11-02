#!/bin/bash

# Actualizar e instalar paquetes
echo "Script de auto configuración de entorno para Rocksolid en RaspberryPi OS"
echo "========================================================================"

echo "Actualizando el sistema..."
sudo apt update && sudo apt upgrade -y

# Instalar paquetes de entorno grafico
echo "Instalando paquetes esenciales..."
sudo DEBIAN_FRONTEND=noninteractive apt install -y xserver-xorg-input-libinput xinput-calibrator openbox git curl wget # Agrega más paquetes aquí
sudo apt-get -y install xinit

# Instalar Rocksolid
echo "Instalando Rocksolid..."
REPO="marcosdandrea/Rocksolid_MediaPlayer"
TOKEN=""

# Consulta la API de GitHub para obtener el enlace al último archivo .deb
LATEST_DEB_URL=$(curl -s -H "Authorization: token $TOKEN" https://api.github.com/repos/$REPO/releases/latest | grep "browser_download_url.*deb" | cut -d '"' -f 4)

if [ -z "$LATEST_DEB_URL" ]; then
  echo "No se pudo obtener el enlace al último .deb. Asegúrate de que haya un release disponible."
  exit 1
fi

# Descargando la ultima version de Rocksolid MediaPlayer
echo "Descargando el paquete .deb..."
sudo wget -O latest_Rocksolid.deb "$LATEST_DEB_URL"

echo "Instalando el Rocksolid MediaPlayer"
sudo dpkg -i latest_Rocksolid.deb
sudo apt -f install -y  # Instalar dependencias faltantes si las hay

# Limpieza del archivo descargado
rm latest_package.deb
echo "Instalación del paquete completada."

# Configurar .xinitrc
echo "Configurando .xinitrc..."
cat <<EOL > ~/.xinitrc
#!/bin/sh
xrandr --output HDMI-1 --mode 1920x1080 
xrandr --output HDMI-2 --mode 1920x1080
exec openbox-session &
sleep 5
exec /usr/bin/rocksolid
EOL

# Asegurar permisos de ejecución en .xinitrc
chmod +x ~/.xinitrc


# Configuración de red (ejemplo)
#echo "Configurando la red..."
#sudo bash -c 'echo "interface wlan0" >> /etc/dhcpcd.conf'
#sudo bash -c 'echo "static ip_address=192.168.1.100/24" >> /etc/dhcpcd.conf' # Cambia por tu IP deseada
#sudo bash -c 'echo "static routers=192.168.1.1" >> /etc/dhcpcd.conf'
#sudo bash -c 'echo "static domain_name_servers=8.8.8.8 8.8.4.4" >> /etc/dhcpcd.conf'

echo "Modificando cmdline.txt para iniciar en consola sin login..."
sudo sed -i 's/console=tty1/console=tty1 auto-login/' /boot/cmdline.txt

# Reiniciar servicios si es necesario
#echo "Reiniciando servicios..."
#sudo systemctl restart dhcpcd

echo "¡Configuración completada!. Se reiniciará el sistema"
sleep 8
sudo reboot
