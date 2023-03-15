package database

import (
	"database/sql"

	"github.com/FabioSebs/ICSGProject/tree/main/backendgo/config"
	_ "github.com/go-sql-driver/mysql"
)

func Connect() (*sql.DB, error) {
	env, err := config.NewConfig()
	if err != nil {
		return nil, err
	}
	return sql.Open("mysql", env.DBURI)
}
