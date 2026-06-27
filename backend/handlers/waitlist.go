package handlers

import (
	"context"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

type WaitlistRequest struct {
	Name  string `json:"name"  binding:"required"`
	Email string `json:"email" binding:"required"`
	City  string `json:"city"`
}

func (h *Handler) JoinWaitlist(c *gin.Context) {
	var req WaitlistRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "name and email are required"})
		return
	}

	req.Email = strings.ToLower(strings.TrimSpace(req.Email))
	req.Name = strings.TrimSpace(req.Name)

	var id string
	err := h.db.QueryRow(
		context.Background(),
		`INSERT INTO waitlist (name, email, city) VALUES ($1, $2, $3)
		 ON CONFLICT DO NOTHING
		 RETURNING id`,
		req.Name, req.Email, req.City,
	).Scan(&id)

	if err != nil {
		// If RETURNING returned nothing (duplicate email), still respond OK
		c.JSON(http.StatusOK, gin.H{"ok": true})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"ok": true, "id": id})
}
