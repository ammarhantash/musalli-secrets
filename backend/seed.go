//go:build ignore

package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

type seedSet struct {
	id          string
	name        string
	description string
	occasion    string
	pieces      []seedPiece
}

type seedPiece struct {
	id           string
	name         string
	category     string
	basePriceSAR float64
	sortOrder    int
}

var sets = []seedSet{
	{
		id: "set_alnur", name: "Al Nur Bridal Set",
		description: "A luminous bridal suite evoking the golden light of Mecca at dawn. Four pieces unified by geometric precision.",
		occasion: "Bridal",
		pieces: []seedPiece{
			{"piece_alnur_1", "Solitaire Engagement Ring", "Ring", 18000, 0},
			{"piece_alnur_2", "Diamond Wedding Band", "Ring", 9500, 1},
			{"piece_alnur_3", "Drop Pendant Necklace", "Necklace", 14000, 2},
			{"piece_alnur_4", "Stud Earrings", "Earrings", 8500, 3},
		},
	},
	{
		id: "set_layla", name: "Layla Evening Set",
		description: "Sculptural evening pieces for the woman who commands a room. Fluid lines, bold presence.",
		occasion: "Evening",
		pieces: []seedPiece{
			{"piece_layla_1", "Cocktail Ring", "Ring", 12000, 0},
			{"piece_layla_2", "Collar Necklace", "Necklace", 16500, 1},
			{"piece_layla_3", "Drop Chandelier Earrings", "Earrings", 11000, 2},
		},
	},
	{
		id: "set_mecca", name: "Mecca Heritage Set",
		description: "Rooted in Islamic geometric tradition. Three pieces that carry centuries of craft into the present.",
		occasion: "Heritage",
		pieces: []seedPiece{
			{"piece_mecca_1", "Filigree Band Ring", "Ring", 8500, 0},
			{"piece_mecca_2", "Geometric Cuff", "Bracelet", 13000, 1},
			{"piece_mecca_3", "Crescent Necklace", "Necklace", 11500, 2},
		},
	},
	{
		id: "set_yawm", name: "Yawm Everyday Set",
		description: "Refined simplicity for daily wear. Lightweight, durable, and effortlessly elegant.",
		occasion: "Everyday",
		pieces: []seedPiece{
			{"piece_yawm_1", "Stackable Ring", "Ring", 5500, 0},
			{"piece_yawm_2", "Delicate Chain Necklace", "Necklace", 7000, 1},
			{"piece_yawm_3", "Huggie Earrings", "Earrings", 4800, 2},
		},
	},
}

func main() {
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		dbURL = "postgres://postgres:dev@localhost:5432/structura"
	}

	pool, err := pgxpool.New(context.Background(), dbURL)
	if err != nil {
		log.Fatalf("connect: %v", err)
	}
	defer pool.Close()

	for _, s := range sets {
		_, err := pool.Exec(context.Background(), `
			INSERT INTO jewelry_sets (id, name, description, occasion)
			VALUES ($1,$2,$3,$4) ON CONFLICT (id) DO NOTHING`,
			s.id, s.name, s.description, s.occasion)
		if err != nil {
			log.Printf("set %s: %v", s.id, err)
			continue
		}
		for _, p := range s.pieces {
			_, err := pool.Exec(context.Background(), `
				INSERT INTO set_pieces (id, set_id, name, category, base_price_sar, sort_order)
				VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (id) DO NOTHING`,
				p.id, s.id, p.name, p.category, p.basePriceSAR, p.sortOrder)
			if err != nil {
				log.Printf("piece %s: %v", p.id, err)
			}
		}
		fmt.Printf("✓ %s\n", s.name)
	}
	fmt.Println("Seed complete")
}
