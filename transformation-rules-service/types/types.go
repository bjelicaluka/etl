package types

type Error struct {
	Message string `json:"message" example:"Something went wrong."`
}

type TransformationRule struct {
	ID    string `json:"id" example:"TransformationRules-123-A"`
	Rules string `json:"rules" example:"take one User where name == 'Luka' and startsWith(surname, 'Bje') select firstName as name, lastName as surname;"`
}

type AddTransformationRule struct {
	Rules string `json:"rules" example:"take one User where name == 'Luka' and startsWith(surname, 'Bje') select firstName as name, lastName as surname;"`
}
