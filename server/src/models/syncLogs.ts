import mongoose from "mongoose";

interface syncLogInterface {
	taskId: mongoose.Schema.Types.ObjectId;
	clickUpTaskId: string;
	direction: 'local_to_clickup' | 'clickup_to_local';
  	changes: any;
	success: boolean;
	error?: string;
	createdAt: Date;
	attempts: number;
};

const syncLogSchema = new mongoose.Schema<syncLogInterface>({
	taskId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Task',
		required: true
	},
	clickUpTaskId: {
		type: String,
		required: true
	},
	direction: {
		type: String,
		enum: ['local_to_clickup', 'clickup_to_local'],
		required: true
	},
	changes: {
		type: mongoose.Schema.Types.Mixed,
		required: true
	},
	success: {
		type: Boolean,
		required: true,
		default: false
	},
	error: {
		type: String,
		required: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	attempts: {
		type: Number,
		default: 1
	}
})