package api

import (
	"net/http"
	"transformation-rules-service/service"
	"transformation-rules-service/types"

	"github.com/gin-gonic/gin"
)

// ShowTransformationRule godoc
// @Summary      Get all TransformationRules
// @Description  Get all TransformationRules
// @Tags         TransformationRules
// @Accept       json
// @Produce      json
// @Success      200  {array}  types.TransformationRule
// @Router       /transformation-rules [get]
func GetAll(svc *service.TransformationRulesService) func(ctx *gin.Context) {
	return func(ctx *gin.Context) {
		transformationRules, err := service.GetAll(svc)

		if transformationRules == nil || err != nil {
			ctx.JSON(http.StatusNotFound, types.Error{
				Message: "TransformationRules NotFound",
			})
			return
		}

		ctx.JSON(http.StatusOK, transformationRules)
	}
}

// ShowTransformationRule godoc
// @Summary      Get TransformationRule by Id
// @Description  Get TransformationRule by Id
// @Tags         TransformationRules
// @Accept       json
// @Produce      json
// @Param        id   path      string  true  "TransformationRule Id"
// @Success      200  {object}  types.TransformationRule
// @Failure      404  {object}  types.Error
// @Router       /transformation-rules/{id} [get]
func Get(svc *service.TransformationRulesService) func(ctx *gin.Context) {
	return func(ctx *gin.Context) {
		id := ctx.Param("id")
		transformationRule, err := service.Get(svc, id)

		if transformationRule == nil || err != nil {
			ctx.JSON(http.StatusNotFound, types.Error{
				Message: "TransformationRule NotFound",
			})
			return
		}

		ctx.JSON(http.StatusOK, transformationRule)
	}
}

// ShowTransformationRule godoc
// @Summary      Create new TransformationRule
// @Description  Create new TransformationRule
// @Tags         TransformationRules
// @Accept       json
// @Produce      json
// @Param        transformationRule   body      types.AddTransformationRule  true  "TransformationRule"
// @Success      200  {object}  types.AddTransformationRule
// @Failure      400  {object}  types.Error
// @Router       /transformation-rules [post]
func Create(svc *service.TransformationRulesService) func(ctx *gin.Context) {
	return func(ctx *gin.Context) {
		var transformationRule types.TransformationRule
		if err := ctx.ShouldBindJSON(&transformationRule); err != nil {
			ctx.JSON(http.StatusBadRequest, types.Error{
				Message: err.Error(),
			})
			return
		}

		createdTransformationRule, err := service.Create(svc, &transformationRule)

		if createdTransformationRule == nil || err != nil {
			ctx.JSON(http.StatusBadRequest, types.Error{
				Message: "TransformationRule Storing Failed",
			})
			return
		}

		ctx.JSON(http.StatusOK, transformationRule)
	}
}

// ShowTransformationRule godoc
// @Summary      Update existing TransformationRule
// @Description  Update existing TransformationRule
// @Tags         TransformationRules
// @Accept       json
// @Produce      json
// @Param        id   path      string  true  "TransformationRule Id"
// @Param        transformationRule   body      types.TransformationRule  true  "TransformationRule"
// @Success      200  {object}  types.TransformationRule
// @Failure      400  {object}  types.Error
// @Failure      404  {object}  types.Error
// @Router       /transformation-rules/{id} [put]
func Update(svc *service.TransformationRulesService) func(ctx *gin.Context) {
	return func(ctx *gin.Context) {
		id := ctx.Param("id")
		var transformationRule types.TransformationRule
		if err := ctx.ShouldBindJSON(&transformationRule); err != nil {
			ctx.JSON(http.StatusBadRequest, types.Error{
				Message: err.Error(),
			})
			return
		}

		updatedTransformationRule, err := service.Update(svc, id, &transformationRule)

		if updatedTransformationRule == nil || err != nil {
			ctx.JSON(http.StatusBadRequest, types.Error{
				Message: "TransformationRule Updating Failed",
			})
			return
		}

		ctx.JSON(http.StatusOK, transformationRule)
	}
}

// ShowTransformationRule godoc
// @Summary      Delete existing TransformationRule
// @Description  Delete existing TransformationRule
// @Tags         TransformationRules
// @Accept       json
// @Produce      json
// @Param        id   path      string  true  "TransformationRule Id"
// @Success      200  {object}  types.TransformationRule
// @Failure      404  {object}  types.Error
// @Router       /transformation-rules/{id} [delete]
func Delete(svc *service.TransformationRulesService) func(ctx *gin.Context) {
	return func(ctx *gin.Context) {
		id := ctx.Param("id")
		transformationRule, err := service.Delete(svc, id)

		if transformationRule == nil || err != nil {
			ctx.JSON(http.StatusNotFound, types.Error{
				Message: "TransformationRule Delete Failed",
			})
			return
		}

		ctx.JSON(http.StatusOK, transformationRule)
	}
}
