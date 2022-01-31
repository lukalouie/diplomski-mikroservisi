import mongoose from "mongoose"

interface CardData {
    title: string,
    price: number,
    userId: string
}

interface CardModel extends mongoose.Model<CardData> {
    createCard(data: CardData): CardDoc
}

interface CardDoc extends mongoose.Document {
    title: string,
    price: number,
    userId: string
}

const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
        }
    }
})

cardSchema.statics.createCard = (data: CardData) => {
    return new Card(data)
}

const Card = mongoose.model<CardDoc, CardModel>("Card", cardSchema)

export { Card }