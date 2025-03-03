export declare class OtpService {
    private otpStorage;
    private transporter;
    private otp_host;
    private otp_port;
    private otp_user;
    private otp_password;
    private otp_digits;
    private otp_period;
    constructor();
    sendOtp(email: string): Promise<{
        message: string;
        error?: undefined;
    } | {
        message: string;
        error: any;
    }>;
    verifyOtp(email: string, otp: string): Promise<{
        valid: boolean;
        message: string;
    }>;
}
