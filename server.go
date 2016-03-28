package main

import (
    "gopkg.in/macaron.v1"
    "math/rand"
)

// Message struct to respond with
type Message struct {
	Points []float32 `json:"points"`
}

func getRandomPoints(length int) []float32 {
	points := make([]float32, length)
	for i := 0; i < length; i++ {
		points[i] = rand.Float32()
	}
	return points
}

func main() {
	m := macaron.Classic()
	m.Use(macaron.Renderer())
	m.Get("/", func(ctx *macaron.Context) {
        ctx.HTML(200, "index")
	})
	m.Get("/data", func(ctx *macaron.Context) {
		msg := Message{getRandomPoints(10)}
		ctx.JSON(200, &msg)
	})
	m.Run()
}