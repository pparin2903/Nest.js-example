import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as OTPAuth from 'otpauth';
import * as nodemailer from 'nodemailer';

interface OtpEntry {
  otp: string;
  expiresAt: Date;
}

@Injectable()
export class OtpService {
  private otpStorage: Map<string, OtpEntry> = new Map();
  private transporter: nodemailer.Transporter;

  private otp_host = 'softel-co-th.mail.protection.outlook.com';
  private otp_port = 25;
  private otp_user = 'admin@softel.co.th';
  private otp_password = '2,bowv:vagm]';
  private otp_digits = 6;
  private otp_period = 300;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: this.otp_host,
      port: this.otp_port,
      auth: {
        user: this.otp_user,
        pass: this.otp_password,
      },
    });
  }

  async sendOtp(email: string) {
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
    } catch (error) {
      console.error('Error sending OTP email:', error);
      throw new HttpException(
        'Error sending OTP email',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async verifyOtp(email: string, otp: string) {
    try {
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
      } else {
        return { valid: false, message: 'Invalid OTP' };
      }
    } catch (error) {
      return { valid: false, message: 'Verify OTP Failed.' };
    }
  }
}
