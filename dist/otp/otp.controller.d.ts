import { OtpService } from './otp.service';
export declare class OtpController {
    private readonly otpService;
    constructor(otpService: OtpService);
    sendOtp(email: string): Promise<{
        message: string;
    }>;
    verifyOtp(body: {
        email: string;
        otp: string;
    }): Promise<{
        valid: boolean;
        message: string;
    }>;
}
