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

export class Cell {
    constructor(row, col, piece = null) {
        this.row = row;
        this.col = col;
        this.piece = piece;
    }

    isEmpty() {
        return this.piece === null;
    }

    setPiece(piece) {
        this.piece = piece;
    }

    removePiece() {
        this.piece = null;
    }
}

export class Piece {
    constructor(type, color) {
        this.type = type;
        this.color = color;
    }

    canMakeMove(from, to, board) {
        // Very move allowed --> Just demo
        return true;
    }
}

export class Pawn extends Piece{ constructor(c){super(PieceType.PAWN,c);} }
export class Rook extends Piece { constructor(c){super(PieceType.ROOK,c);} }
export class Knight extends Piece { constructor(c){super(PieceType.KNIGHT,c);} }
export class Bishop extends Piece { constructor(c){super(PieceType.BISHOP,c);} }
export class Queen extends Piece { constructor(c){super(PieceType.QUEEN,c);} }
export class King extends Piece { constructor(c){super(PieceType.KING,c);} }

export class Board {
    constructor() {
        this.grid = [];

        for (let r = 0; r < 8; r++) {
            this.grid[r] = [];
            for (let c = 0; c < 8; c++) {
                this.grid[r][c] = new Cell(r, c, null);
            }
        }
    }

    getCell(row, col) {
        return this.grid[row][col];
    }

    movePiece(from, to) {
        const fromCell = this.getCell(from.row, from.col);
        const toCell = this.getCell(to.row, to.col);

        const piece = fromCell.piece;
        toCell.setPiece(piece);
        fromCell.removePiece();
    }
}

export class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}

export class Game {
    constructor(whiteName, blackName) {
        this.whiteP = new Player(whiteName, Color.WHITE);
        this.blackP = new Player(blackName, Color.BLACK);

        this.currPlayer = Color.WHITE;
        this.board = new Board();

        this.setupInitialPieces();
    }

    setupInitialPieces() {
        const mainPieces = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook];

        // Black mainPieces
        for (let c = 0; c < 8; c++)
            this.board.getCell(0, c).setPiece(new mainPieces[c](Color.BLACK));

        // Black pawns
        for (let c = 0; c < 8; c++)
            this.board.getCell(1, c).setPiece(new Pawn(Color.BLACK));

        // White pawns
        for (let c = 0; c < 8; c++)
            this.board.getCell(6, c).setPiece(new Pawn(Color.WHITE));

        // White mainPieces
        for (let c = 0; c < 8; c++)
            this.board.getCell(7, c).setPiece(new mainPieces[c](Color.WHITE));
    }

    validateMove(from, to) {
        return true; // demo mode will always validate
    }

    makeMove(from, to) {
        this.board.movePiece(from, to);
        this.currPlayer = this.currPlayer === Color.WHITE ? Color.BLACK : Color.WHITE;
    }
}

export function createGame(white, black) {
    return new Game(white, black);
}
