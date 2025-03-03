"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const OTPAuth = require("otpauth");
const nodemailer = require("nodemailer");
let OtpService = class OtpService {
    constructor() {
        this.otpStorage = new Map();
        this.otp_host = 'softel-co-th.mail.protection.outlook.com';
        this.otp_port = 25;
        this.otp_user = 'admin@softel.co.th';
        this.otp_password = '2,bowv:vagm]';
        this.otp_digits = 6;
        this.otp_period = 300;
        this.transporter = nodemailer.createTransport({
            host: this.otp_host,
            port: this.otp_port,
            auth: {
                user: this.otp_user,
                pass: this.otp_password,
            },
        });
    }
    async sendOtp(email) {
        const secret = new OTPAuth.Secret();
        const totp = new OTPAuth.TOTP({
            label: email,
            digits: this.otp_digits,
            period: this.otp_period,
            secret,
        });
        const otp = totp.generate();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        this.otpStorage.set(email, { otp, expiresAt });
        try {
            await this.transporter.sendMail({
                from: this.otp_user,
                to: email,
                subject: 'Your OTP code.',
                html: `OTP code is : ${otp}`,
                dsn: {
                    id: 'unique-id',
                    return: 'headers',
                    notify: ['failure', 'delay'],
                    recipient: this.otp_user,
                },
            });
            return { message: 'OTP sent successfully' };
        }
        catch (error) {
            console.error('Error sending OTP email:', error);
            return { message: 'Failed to send OTP email', error };
        }
    }
    async verifyOtp(email, otp) {
        const otpEntry = this.otpStorage.get(email);
        if (!otpEntry) {
            return { valid: false, message: 'OTP not found for the email' };
        }
        if (new Date() >= otpEntry.expiresAt) {
            this.otpStorage.delete(email);
            return { valid: false, message: 'OTP has expired' };
        }
        if (otpEntry.otp === otp) {
            this.otpStorage.delete(email);
            return { valid: true, message: 'OTP is valid' };
        }
        else {
            return { valid: false, message: 'Invalid OTP' };
        }
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], OtpService);
//# sourceMappingURL=otp.service.js.map