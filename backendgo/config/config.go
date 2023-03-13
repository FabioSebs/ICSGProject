package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port  string
	DBURI string
}

func NewConfig() (Config, error) {
	err := godotenv.Load(".env")
	if err != nil {
		return Config{}, err
	}

	config := Config{
		Port:  os.Getenv("PORT"),
		DBURI: os.Getenv("DBURI"),
	}

	return config, nil
}

func (c *Config) GetPort() string {
	return c.Port
}

func (c *Config) GetURI() string {
	return c.DBURI
}
