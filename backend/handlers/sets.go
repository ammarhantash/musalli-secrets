package handlers

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Handler struct{ db *pgxpool.Pool }

func New(db *pgxpool.Pool) *Handler { return &Handler{db: db} }

type SetPiece struct {
	ID           string  `json:"id"`
	SetID        string  `json:"setId"`
	Name         string  `json:"name"`
	Category     string  `json:"category"`
	BasePriceSAR float64 `json:"basePriceSAR"`
	SortOrder    int     `json:"sortOrder"`
}

type JewelrySet struct {
	ID          string     `json:"id"`
	Name        string     `json:"name"`
	Description string     `json:"description"`
	Occasion    string     `json:"occasion"`
	CreatedAt   string     `json:"createdAt"`
	Pieces      []SetPiece `json:"pieces"`
}

func (h *Handler) GetSets(c *gin.Context) {
	rows, err := h.db.Query(context.Background(), `
		SELECT id, name, description, occasion, created_at::text
		FROM jewelry_sets ORDER BY created_at ASC`)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var sets []JewelrySet
	for rows.Next() {
		var s JewelrySet
		if err := rows.Scan(&s.ID, &s.Name, &s.Description, &s.Occasion, &s.CreatedAt); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		s.Pieces = h.getPieces(s.ID)
		sets = append(sets, s)
	}
	if sets == nil {
		sets = []JewelrySet{}
	}
	c.JSON(http.StatusOK, sets)
}

func (h *Handler) GetSet(c *gin.Context) {
	id := c.Param("id")
	var s JewelrySet
	err := h.db.QueryRow(context.Background(), `
		SELECT id, name, description, occasion, created_at::text
		FROM jewelry_sets WHERE id=$1`, id).
		Scan(&s.ID, &s.Name, &s.Description, &s.Occasion, &s.CreatedAt)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Set not found"})
		return
	}
	s.Pieces = h.getPieces(id)
	c.JSON(http.StatusOK, s)
}

func (h *Handler) getPieces(setID string) []SetPiece {
	rows, err := h.db.Query(context.Background(), `
		SELECT id, set_id, name, category, base_price_sar, sort_order
		FROM set_pieces WHERE set_id=$1 ORDER BY sort_order ASC`, setID)
	if err != nil {
		return []SetPiece{}
	}
	defer rows.Close()

	var pieces []SetPiece
	for rows.Next() {
		var p SetPiece
		if err := rows.Scan(&p.ID, &p.SetID, &p.Name, &p.Category, &p.BasePriceSAR, &p.SortOrder); err != nil {
			continue
		}
		pieces = append(pieces, p)
	}
	if pieces == nil {
		return []SetPiece{}
	}
	return pieces
}

type CommissionReq struct {
	SetID         string  `json:"setId" binding:"required"`
	MetalType     string  `json:"metalType" binding:"required"`
	GemType       string  `json:"gemType" binding:"required"`
	CaratWeight   float64 `json:"caratWeight" binding:"required"`
	TotalPriceSAR float64 `json:"totalPriceSAR" binding:"required"`
}

func (h *Handler) Commission(c *gin.Context) {
	var req CommissionReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing required fields"})
		return
	}

	var id string
	err := h.db.QueryRow(context.Background(), `
		INSERT INTO commissions (set_id, metal_type, gem_type, carat_weight, total_price_sar)
		VALUES ($1,$2,$3,$4,$5) RETURNING id`,
		req.SetID, req.MetalType, req.GemType, req.CaratWeight, req.TotalPriceSAR).
		Scan(&id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "commissionId": id})
}
