package api

import (
	"github.com/FabioSebs/ICSGProject/tree/main/backendgo/config"
	"github.com/FabioSebs/ICSGProject/tree/main/backendgo/controllers"
	"github.com/FabioSebs/ICSGProject/tree/main/backendgo/crud"
	"github.com/FabioSebs/ICSGProject/tree/main/backendgo/database"
	"github.com/FabioSebs/ICSGProject/tree/main/backendgo/model"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func CreateRoutes(rg *gin.RouterGroup) error {
	// Objects for Handlers
	var userModel model.User
	db, err := database.Connect()
	if err != nil {
		return err
	}
	crud := crud.NewCrud(userModel, db)
	handlers := controllers.NewController(crud)

	// Routes + Handlers
	routes := rg.Group("/users")

	routes.GET("/all", handlers.GETAllUsers)
	routes.POST("/add", handlers.POSTUser)
	routes.POST("/login", handlers.LOGINUser)
	routes.DELETE("/delete", handlers.DELETEUser)
	routes.PATCH("/update/user/", handlers.MODIFYUser)
	routes.PATCH("/update/phone/:username", handlers.MODIFYPhone)

	return nil
}

func CreateAPI() error {
	env, err := config.NewConfig()
	if err != nil {
		return err
	}
	server := gin.Default()
	server.Use(cors.Default())

	err = CreateRoutes(&server.RouterGroup)
	if err != nil {
		return err
	}
	err = server.Run(env.Port)
	if err != nil {
		return err
	}
	return nil
}
