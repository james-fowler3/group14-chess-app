class Piece {
    /**
     * Base class for all chess pieces.
     * 
     * @param {string} type       - One of: "P", "R", "N", "B", "Q", "K"
     * @param {string} color      - "w" or "b"
     * @param {Object} position   - { row: int, col: int }
     */
    constructor(type, color, position = null) {
        this.type = type;       // PieceType
        this.color = color;     // Color
        this.position = position; // { row, col } or null
    }

    /**
     * Abstract method.
     * Validates whether the piece can move from one Cell to another.
     * Subclasses MUST override this.
     * 
     * @param {Cell} fromCell
     * @param {Cell} toCell
     * @param {Board} board
     * @returns {boolean}
     */
    canMakeMove(fromCell, toCell, board) {
        // According to your class skeleton:
        // Base Piece returns 'false' and each subclass overrides it.
        return false;
    }

    /**
     * Utility: check if a target cell contains an opponent's piece.
     */
    isOpponentPiece(cell) {
        if (!cell || !cell.piece) return false;
        return cell.piece.color !== this.color;
    }
}

export default Piece;
