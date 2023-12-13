# Protontest Installation Guide

## Windows

### Prerequisites
- Windows 10 64-bit: Pro, Enterprise, or Education (Build 16299 or later).
- Hyper-V and Containers Windows features must be enabled.

### Steps
1. **Download Docker Desktop for Windows**  
   Download the installer from [Docker Hub](https://hub.docker.com/editions/community/docker-ce-desktop-windows).

2. **Install Docker Desktop**  
   Run the installer and follow the on-screen instructions.

3. **Start Docker Desktop**  
   Docker Desktop does not start automatically after installation. To start Docker Desktop, search for Docker, and select `Docker Desktop` in the search results.

   Docker Desktop includes Docker Compose as part of the installation.

4. **Running Docker Compose**  
   - Open a terminal or command prompt.
   - Navigate to your project directory (where your `docker-compose.yml` file is located).
   - Run the following command:
     ```bash
     docker-compose up -d
     ```

## Ubuntu

### Prerequisites
- 64-bit version of Ubuntu
- sudo privileges

### Steps
1. **Update the apt package index**  
   ```bash
   sudo apt-get update
   ```

2. **Install packages to allow apt to use a repository over HTTPS**  
   ```bash
   sudo apt-get install \
     apt-transport-https \
     ca-certificates \
     curl \
     software-properties-common
   ```

3. **Add Docker’s official GPG key**  
   ```bash
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   ```

4. **Set up the stable repository**  
   ```bash
   sudo add-apt-repository \
     "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
     $(lsb_release -cs) \
     stable"
   ```

5. **Install Docker Engine**  
   ```bash
   sudo apt-get update
   sudo apt-get install docker-ce
   ```

6. **Install Docker Compose**  
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

7. **Verify that Docker Engine is installed correctly**  
   ```bash
   sudo docker run hello-world
   ```

8. **Running Docker Compose**  
   - Open a terminal.
   - Navigate to your project directory.
   - Run the following command:
     ```bash
     docker-compose up -d
     ```

## macOS

### Prerequisites
- Mac hardware must be a 2010 or a newer model, with Intel’s hardware support for memory management unit (MMU) virtualization.
- macOS must be version 10.14 or newer.

### Steps
1. **Download Docker Desktop for Mac**  
   Download the installer from [Docker Hub](https://hub.docker.com/editions/community/docker-ce-desktop-mac).

2. **Install Docker Desktop**  
   Double-click `Docker.dmg` to open the installer, then drag the Docker icon to the Applications folder.

3. **Start Docker Desktop**  
   Open Docker from the Applications folder/Launchpad.

   Docker Desktop includes Docker Compose as part of the installation.

4. **Running Docker Compose**  
   - Open a terminal.
   - Navigate to your project directory.
   - Run the following command:
     ```bash
     docker-compose up -d
     ```