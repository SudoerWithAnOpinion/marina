project = "marina"

app "marina" {
  labels = {
    "service" = "marina"
    "env"     = "dev"
  }
  build {
    use "docker" {}
  }
  deploy {
    use "docker" {
      service_port = 5173
    }
  }
}
