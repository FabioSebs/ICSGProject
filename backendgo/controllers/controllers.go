package controllers

import (
	"fmt"
	"net/http"

	"github.com/FabioSebs/ICSGProject/tree/main/backendgo/crud"
	"github.com/FabioSebs/ICSGProject/tree/main/backendgo/model"
	"github.com/gin-gonic/gin"
)

// routes.GET("/all", handlers.GETAllUsers())
// routes.POST("/add", handlers.POSTUser())
// routes.DELETE("/delete", handlers.DELETEUser())
// routes.PATCH("/modify/user/:username", handlers.MODIFYUser())
// routes.PATCH("/modify/phone/:username", handlers.MODIFYPhone())
type ControllersInterface interface {
	GETAllUsers(ctx *gin.Context)
	POSTUser(ctx *gin.Context)
	DELETEUser(ctx *gin.Context)
	MODIFYUser(ctx *gin.Context)
	MODIFYPhone(ctx *gin.Context)
	LOGINUser(ctx *gin.Context)
}

type Controllers struct {
	Crud crud.Crud
}

func NewController(crud crud.Crud) Controllers {
	return Controllers{
		Crud: crud,
	}
}

// @BasePath /users

// Get All Users godoc
// @Summary Get All Users
// @Schemes
// @Description Get all users from Database
// @Tags Read
// @Accept json
// @Produce json
// @Router /users/all [get]
func (c *Controllers) GETAllUsers(ctx *gin.Context) {
	users, err := c.Crud.GetUsers()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, users.List)
}

// @Summary Post User
// @Tags Create
// @Produce  json
// @Param username path string true "username"
// @Param password path string true "password"
// @Param mobile path string true "mobile"
// @Success 200 {string} success
// @Router /users/add [post]
func (c *Controllers) POSTUser(ctx *gin.Context) {
	var newUser model.User

	if err := ctx.BindJSON(&newUser); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	c.Crud.Model = newUser
	user, err := c.Crud.AddUser()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, user)
}

// @Summary Delete User
// @Tags Delete
// @Produce  json
// @Param username path string true "username"
// @Success 200 {string} success
// @Router /users/delete [delete]
func (c *Controllers) DELETEUser(ctx *gin.Context) {
	var newUser model.User
	if err := ctx.BindJSON(&newUser); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	c.Crud.Model = newUser

	if err := c.Crud.DeleteUser(); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "success"})
}

// @Summary Update Phone
// @Tags Update
// @Produce  json
// @Param mobile path string true "mobile"
// @Success 200 {string} success
// @Router /users/update/mobile/{username} [patch]
func (c *Controllers) MODIFYPhone(ctx *gin.Context) {
	var newUser model.User
	username := ctx.Param("username")

	if err := ctx.BindJSON(&newUser); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	c.Crud.Model = newUser

	if err := c.Crud.ModifyOnlyPhone(username); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "success"})
}

// @Summary Update User
// @Tags Update
// @Produce  json
// @Param original path string true "original"
// @Param username path string true "username"
// @Param password path string true "password"
// @Param mobile path string true "mobile"
// @Success 200 {string} success
// @Router /users/update/user [patch]
func (c *Controllers) MODIFYUser(ctx *gin.Context) {
	type modifyUser struct {
		Original string `json:"original"`
		Username string `json:"username"`
		Password string `json:"password"`
		Phone    string `json:"phone"`
	}
	var reqBody modifyUser

	if err := ctx.BindJSON(&reqBody); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	c.Crud.Model.Username = reqBody.Username
	c.Crud.Model.Password = reqBody.Password
	c.Crud.Model.Mobile = reqBody.Phone

	if err := c.Crud.ModifyUser(reqBody.Original); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "success"})
}

// @Summary Login User
// @Tags Create
// @Produce  json
// @Param username path string true "username"
// @Param password path string true "password"
// @Success 200 {string} success
// @Router /users/login [post]
func (c *Controllers) LOGINUser(ctx *gin.Context) {
	var newUser model.User

	if err := ctx.BindJSON(&newUser); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.Crud.Model = newUser
	err := c.Crud.LoginUser()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "success"})
}

func (ctrl *Controllers) CORS() gin.HandlerFunc {
	return func(c *gin.Context) {

		fmt.Println(c.Request.Header)
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, Origin, Cache-Control, X-Requested-With")
		//c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
