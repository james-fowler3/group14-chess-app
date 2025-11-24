class Cell {
    /**
     * Represents a single square on the chess board.
     * 
     * @param {Piece|null} piece 
     * @param {string|null} color  - "w" or "b" (only if needed)
     * @param {Object} position    - { row: int, col: int }
     */
    constructor(piece = null, color = null, position = null) {
        this.piece = piece;       // Piece or null
        this.color = color;       // Board color (optional)
        this.position = position; // { row, col }
    }

    getPiece() {
        return this.piece;
    }

    setPiece(piece) {
        this.piece = piece;
    }

    removePiece() {
        this.piece = null;
    }

    isEmpty() {
        return this.piece === null;
    }
}

export default Cell;
