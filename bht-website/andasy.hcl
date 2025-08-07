# andasy.hcl app configuration file generated for bht on Tuesday, 05-Aug-25 16:13:19 EET
#
# See https://github.com/quarksgroup/andasy-cli for information about how to use this file.

app_name = "bht"

app {

  env = {
     HOST = "::"

  }

  port = 80

  compute {
    cpu      = 1
    memory   = 256
    cpu_kind = "shared"
  }

  process {
    name = "bht"
  }

}
