import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private typeOrm: TypeOrmHealthIndicator,
  ) {}
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.typeOrm.pingCheck('customers', { timeout: 3000 })
    ]);
  }
}
