package crud

import (
	"database/sql"
	"fmt"

	"github.com/FabioSebs/ICSGProject/tree/main/backendgo/model"
)

type CrudInterface interface {
	GetUsers() ([]model.User, error)
	AddUser() (model.User, error)
	DeleteUser() error
	ModifyUser() error
	ModifyOnlyPhone() error
	LoginUser() error
}

type Crud struct {
	Model model.User
	DB    *sql.DB
}
type UserList struct {
	List []model.User `json:"userlist"`
}

func NewCrud(m model.User, db *sql.DB) Crud {
	return Crud{
		Model: m,
		DB:    db,
	}
}

func (c *Crud) GetUsers() (UserList, error) {
	var userList UserList
	rows, err := c.DB.Query(GetUsersQuery)
	if err != nil {
		return UserList{}, err
	}
	for rows.Next() {
		var user model.User
		err := rows.Scan(&user.Id, &user.Username, &user.Password, &user.Mobile)
		if err != nil {
			return UserList{}, err
		}
		userList.List = append(userList.List, user)
	}
	return userList, nil
}

func (c *Crud) LoginUser() error {
	var user model.User
	if err := c.DB.QueryRow(GetSingleUser, c.Model.Username).Scan(&user.Id, &user.Username, &user.Password, &user.Mobile); err != nil {
		return err
	}
	if c.Model.Password != user.Password {
		return fmt.Errorf("passwords do not match")
	}
	return nil
}

func (c *Crud) AddUser() (model.User, error) {
	fmt.Println(c.Model)
	_, err := c.DB.Exec(AddUserQuery, c.Model.Username, c.Model.Password, c.Model.Mobile)
	if err != nil {
		return model.User{}, err
	}
	return c.Model, nil
}

func (c *Crud) DeleteUser() error {
	_, err := c.DB.Exec(DeleteUserQuery, c.Model.Username)
	if err != nil {
		return err
	}
	return nil
}

func (c *Crud) ModifyUser(username string) error {
	var user model.User
	if err := c.DB.QueryRow(GetSingleUser, username).Scan(&user.Id, &user.Username, &user.Password, &user.Mobile); err != nil {
		return err
	}

	if c.Model.Username == "" {
		c.Model.Username = user.Username
	}
	if c.Model.Password == "" {
		c.Model.Password = user.Password
	}
	if c.Model.Mobile == "" {
		c.Model.Mobile = user.Mobile
	}

	_, err := c.DB.Exec(ModifyUserQuery, c.Model.Username, c.Model.Password, c.Model.Mobile, user.Id)
	if err != nil {
		return err
	}

	return nil
}

func (c *Crud) ModifyOnlyPhone(username string) error {
	_, err := c.DB.Exec(ModifyOnlyPhoneQuery, c.Model.Mobile, username)
	if err != nil {
		return err
	}
	return nil
}
