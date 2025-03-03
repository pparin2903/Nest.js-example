import { Controller, Post, Body } from '@nestjs/common';
import { OtpService } from './otp.service';
import { Public } from 'src/auth/roles.decorator';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Public()
  @Post('send')
  sendOtp(@Body('email') email: string) {
    return this.otpService.sendOtp(email);
  }

  @Public()
  @Post('verify')
  verifyOtp(@Body() body: { email: string; otp: string }) {
    return this.otpService.verifyOtp(body.email, body.otp);
  }
}
