import React from "react";
import {AuthorizationService} from "@/src/services/AuthorizationService";

interface ActiveUserPageProps {
    searchParams: {
        code?: string;
    };
}

export default async function ActiveUserPage(props: ActiveUserPageProps) {
    const {searchParams} = props;
    const activationCode = searchParams.code;

    let activationResult: boolean | null = null;
    let message: string = '';

    if (activationCode) {
        try {
            await AuthorizationService.activeUser(activationCode);
            activationResult = true;
            message = 'Váš účet byl úspěšně aktivován!';
        } catch (error) {
            console.error('Došlo k chybě při aktivaci:', error);
            activationResult = false;
            message = 'Došlo k neočekávané chybě během aktivace. Zkuste to prosím později.';
        }
    } else {
        activationResult = false;
        message = 'Pro aktivaci účtu je vyžadován platný kód. Zkontrolujte prosím odkaz z e-mailu.';
    }

    return (
        <div style={{ padding: '20px', textAlign: 'center', maxWidth: '600px', margin: '50px auto', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            {(
                <div>
                    {activationResult ? (
                        <>
                            <h1 style={{color: '#28a745'}}>✅ Účet Aktivován!</h1>
                            <p style={{fontSize: '1.1em', lineHeight: '1.6'}}>{message}</p>
                            <p style={{marginTop: '20px'}}>
                                Nyní se můžete <a href="/login" style={{
                                color: '#007bff',
                                textDecoration: 'none',
                                fontWeight: 'bold'
                            }}>přihlásit</a>.
                            </p>
                        </>
                    ) : (
                        <>
                            <h1 style={{color: '#dc3545'}}>❌ Chyba při Aktivaci</h1>
                            <p style={{fontSize: '1.1em', lineHeight: '1.6'}}>{message}</p>
                            <p style={{marginTop: '20px'}}>
                                Pokud problémy přetrvávají, <a href="/contact" style={{
                                color: '#007bff',
                                textDecoration: 'none',
                                fontWeight: 'bold'
                            }}>kontaktujte nás</a>.
                            </p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}