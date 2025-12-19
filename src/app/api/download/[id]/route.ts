import {FinancialDocumentType} from "@/src/api/openapi";
import {NextRequest, NextResponse } from "next/server";
import {downloadFinancialDocument} from "@/src/server-actions/trips/tripsOfferActions";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const idString = resolvedParams.id;
        const { searchParams } = new URL(request.url);
        const typeStr = searchParams.get('type');
        const documentId = parseInt(idString);

        const allowedTypes = Object.values(FinancialDocumentType) as string[];

        if (isNaN(documentId) || (!typeStr || !allowedTypes.includes(typeStr))) {
            return new NextResponse("Missing parameters", { status: 400 });
        }

        const blob = await downloadFinancialDocument({
            documentId: documentId,
            type: typeStr as FinancialDocumentType
        });

        const headers = new Headers();
        headers.set('Content-Type', blob.type);
        headers.set('Content-Disposition', `attachment; filename="document_${documentId}.${blob.type.split('/')[1] || 'pdf'}"`);

        return new NextResponse(blob, {
            status: 200,
            headers,
        });
    } catch (error) {
        console.error("Download error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}