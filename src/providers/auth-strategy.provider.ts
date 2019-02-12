// src/providers/auth-strategy.provider.ts
import {Provider, inject, ValueOrPromise} from '@loopback/context';
import {Strategy} from 'passport';
import {
  AuthenticationBindings,
  AuthenticationMetadata,
  UserProfile,
} from '@loopback/authentication';
import {BasicStrategy} from 'passport-http';

const users = require('../../users.json');

export class MyAuthStrategyProvider implements Provider<Strategy | undefined> {
  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
  ) {}

  value(): ValueOrPromise<Strategy | undefined> {
    // The function was not decorated, so we shouldn't attempt authentication
    if (!this.metadata) {
      return undefined;
    }

    const name = this.metadata.strategy;
    if (name === 'BasicStrategy') {
      return new BasicStrategy(this.verify);
    } else {
      return Promise.reject(`The strategy ${name} is not available.`);
    }
  }

  async verify(
    username: string,
    password: string,
    cb: (err: Error | null, user?: UserProfile | false) => void,
  ) {
    // const users: any = {
    //   nka: 'nka',
    // };

    if (users[username] === password) {
      cb(null, {id: username});
    } else {
      cb(null, false);
    }
  }
}
