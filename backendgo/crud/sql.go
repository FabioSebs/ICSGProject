package crud

const (
	GetUsersQuery        = "SELECT * FROM Users;"
	AddUserQuery         = "INSERT INTO Users(username, password, phone) VALUES(?,?,?);"
	DeleteUserQuery      = "DELETE FROM Users WHERE username = ?;"
	ModifyUserQuery      = "UPDATE Users SET username = ?, password = ?, phone = ? WHERE id = ?;"
	ModifyOnlyPhoneQuery = "UPDATE Users SET phone = ? WHERE username = ?;"
	GetSingleUser        = "SELECT * FROM Users WHERE username = ?;"
)
