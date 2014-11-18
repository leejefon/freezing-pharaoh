//
//  ViewController.h
//  TCO14
//
//  Created by Jeff Lee on 11/17/14.
//  Copyright (c) 2014 Shady Elyaski. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <SpeechKit/SpeechKit.h>

@interface ViewController : UIViewController <SpeechKitDelegate, SKRecognizerDelegate, UITableViewDataSource, UITableViewDelegate> {
    SKRecognizer* voiceSearch;
    enum {
        TS_IDLE,
        TS_INITIAL,
        TS_RECORDING,
        TS_PROCESSING,
    } transactionState;
}

@property(readonly)         SKRecognizer* voiceSearch;
@end

