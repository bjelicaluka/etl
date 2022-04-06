package main

import (
	"transformation-rules-service/api"
	_ "transformation-rules-service/docs"
	"transformation-rules-service/service"
	_ "transformation-rules-service/types"

	"github.com/gin-gonic/gin"
	ginSwagger "github.com/swaggo/gin-swagger"

	swaggerFiles "github.com/swaggo/files"
)

// @title           Transformation Rules Service
// @version         1.0
// @description     This is a sample server celler server.

// @host      localhost:8000
// @BasePath  /api/v1

// @securityDefinitions.basic  BasicAuth
func main() {
	r := gin.Default()

	transformationRulesService, err := service.New()
	if err != nil {
		return
	}

	v1 := r.Group("/api/v1")
	{
		accounts := v1.Group("/transformation-rules")
		{
			accounts.GET("", api.GetAll(&transformationRulesService))
			accounts.GET(":id", api.Get(&transformationRulesService))
			accounts.POST("", api.Create(&transformationRulesService))
			accounts.PUT(":id", api.Update(&transformationRulesService))
			accounts.DELETE(":id", api.Delete(&transformationRulesService))
		}
	}
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	r.Run(":8000")
}
