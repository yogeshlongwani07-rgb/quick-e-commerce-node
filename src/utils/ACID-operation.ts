import mongoose, { ClientSession } from "mongoose";

type TransactionOptions = {
  maxRetries?: number;
};

export async function withTransaction<T>(
  fn: (session: ClientSession) => Promise<T>,
  { maxRetries = 3 }: TransactionOptions = {},
): Promise<T> {
  const session = await mongoose.startSession();

  try {
    let attempt = 0;

    while (true) {
      attempt++;

      try {
        session.startTransaction();

        const result = await fn(session);

        await commitWithRetry(session);

        return result;
      } catch (err) {
        await safeAbort(session);

        const error = err as {
          errorLabels?: string[];
        };

        const isTransient =
          error.errorLabels?.includes("TransientTransactionError") ?? false;

        if (isTransient && attempt < maxRetries) {
          continue;
        }

        throw err;
      }
    }
  } finally {
    await session.endSession();
  }
}

async function commitWithRetry(session: ClientSession): Promise<void> {
  while (true) {
    try {
      await session.commitTransaction();
      return;
    } catch (err) {
      const error = err as {
        errorLabels?: string[];
      };

      const isRetryableCommit =
        error.errorLabels?.includes("UnknownTransactionCommitResult") ?? false;

      if (isRetryableCommit) {
        continue;
      }

      throw err;
    }
  }
}

async function safeAbort(session: ClientSession): Promise<void> {
  try {
    await session.abortTransaction();
  } catch (err) {
    console.error("Failed to abort transaction:", err);
  }
}
