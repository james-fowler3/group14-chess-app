// ===============================
// ENUMS
// ===============================

export const Color = {
    WHITE: "w",
    BLACK: "b"
};

export const PieceType = {
    PAWN: "P",
    ROOK: "R",
    KNIGHT: "N",
    BISHOP: "B",
    QUEEN: "Q",
    KING: "K"
};

// ===============================
// CELL CLASS
// ===============================

class Cell {
    constructor(piece = null, position = null) {
        this.piece = piece;       // Piece or null
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

// ===============================
// PIECE CLASS (Base)
// ===============================

class Piece {
    constructor(type, color, position = null) {
        this.type = type;         // PieceType
        this.color = color;       // Color
        this.position = position; // { row, col }
    }

    canMakeMove(fromCell, toCell, board) {
        // Demo version – always true
        return true;
    }
}

// ===============================
// BOARD CLASS
// ===============================

class Board {
    constructor() {
        this.grid = this.createEmptyBoard();
    }

    createEmptyBoard() {
        return Array.from({ length: 8 }, (_, row) =>
            Array.from({ length: 8 }, (_, col) => {
                return new Cell(null, { row, col });
            })
        );
    }

    placePiece(piece, row, col) {
        this.grid[row][col].setPiece(piece);
        piece.position = { row, col };
    }

    movePiece(from, to) {
        const fromCell = this.grid[from.row][from.col];
        const toCell = this.grid[to.row][to.col];

        const piece = fromCell.getPiece();

        // Capture handling (demo)
        if (!toCell.isEmpty()) {
            // In full version: store captured piece
        }

        toCell.setPiece(piece);
        fromCell.removePiece();

        piece.position = { row: to.row, col: to.col };
    }

    getPiece(row, col) {
        return this.grid[row][col].getPiece();
    }
}

// ===============================
// PLAYER CLASS
// ===============================

class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}

// ===============================
// GAME CLASS
// ===============================

class Game {
    constructor(id, whiteName, blackName) {
        this.id = id;

        this.whiteP = new Player(whiteName, Color.WHITE);
        this.blackP = new Player(blackName, Color.BLACK);

        this.board = new Board();
        this.currPlayer = Color.WHITE;

        this.setupInitialPieces();
    }

    setupInitialPieces() {
        const row = (color, type) => new Piece(type, color);

        // Black major pieces (row 0)
        const blackBackRank = ["R", "N", "B", "Q", "K", "B", "N", "R"];
        blackBackRank.forEach((type, col) => {
            this.board.placePiece(row(Color.BLACK, type), 0, col);
        });

        // Black pawns (row 1)
        for (let col = 0; col < 8; col++) {
            this.board.placePiece(row(Color.BLACK, "P"), 1, col);
        }

        // White pawns (row 6)
        for (let col = 0; col < 8; col++) {
            this.board.placePiece(row(Color.WHITE, "P"), 6, col);
        }

        // White major pieces (row 7)
        const whiteBackRank = ["R", "N", "B", "Q", "K", "B", "N", "R"];
        whiteBackRank.forEach((type, col) => {
            this.board.placePiece(row(Color.WHITE, type), 7, col);
        });
    }

    validateMove(from, to) {
        // Demo: always allow move
        return true;
    }

    makeMove(from, to) {
        this.board.movePiece(from, to);
        this.currPlayer = this.currPlayer === Color.WHITE ? Color.BLACK : Color.WHITE;
    }
}

// ===============================
// FACTORY
// ===============================

export function createGame(id, whiteName, blackName) {
    return new Game(id, whiteName, blackName);
}

// Exporting game operations used by React
export function validateMove(game, from, to) {
    return game.validateMove(from, to);
}

export function makeMove(game, from, to) {
    game.makeMove(from, to);
    return game;
}
