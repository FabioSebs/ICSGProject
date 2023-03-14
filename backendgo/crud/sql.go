package crud

const (
	GetUsersQuery        = "SELECT id, username, password, mobile FROM User;"
	AddUserQuery         = "INSERT INTO User(username, password, mobile) VALUES(?,?,?);"
	DeleteUserQuery      = "DELETE FROM User WHERE username = ?;"
	ModifyUserQuery      = "UPDATE User SET username = ?, password = ?, mobile = ? WHERE id = ?;"
	ModifyOnlyPhoneQuery = "UPDATE User SET mobile = ? WHERE username = ?;"
	GetSingleUser        = "SELECT id, username, password, mobile FROM User WHERE username = ?;"
)
