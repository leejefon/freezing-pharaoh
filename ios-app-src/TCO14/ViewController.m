//
//  ViewController.m
//  TCO14
//
//  Created by Jeff Lee on 11/17/14.
//  Copyright (c) 2014 Shady Elyaski. All rights reserved.
//

#import "ViewController.h"
#import "MultiplePulsingHaloLayer.h"
#import "PulsingHaloLayer.h"
#import <SDWebImage/UIImageView+WebCache.h>
#import <ASIHTTPRequest/ASIHTTPRequest.h>
#import "YoutubePlayerViewController.h"
#import <Foundation/NSCharacterSet.h>

@interface ViewController (){
    MultiplePulsingHaloLayer *multiLayer;
    BOOL isFirstTime;
}
@property (weak, nonatomic) IBOutlet UILabel *textLbl;
@property (weak, nonatomic) IBOutlet UIView *bgView;
@property (weak, nonatomic) IBOutlet UIActivityIndicatorView *spinner;
@property (weak, nonatomic) IBOutlet UITableView *tblView;
@property (strong, nonatomic) NSArray *videoArr;
@end

@implementation ViewController
@synthesize voiceSearch;
@synthesize videoArr;

const unsigned char SpeechKitApplicationKey[] = {0x74, 0x40, 0xf3, 0xc1, 0xe9, 0xbc, 0x0d, 0xf6, 0xbe, 0x94, 0xc4, 0x24, 0x7b, 0x68, 0xe8, 0x9c, 0x4f, 0x91, 0x55, 0xb5, 0x32, 0x88, 0xc6, 0x58, 0xeb, 0xad, 0x88, 0x94, 0xab, 0xb0, 0xe0, 0x1f, 0xf0, 0xd4, 0xe0, 0xda, 0x90, 0xee, 0xd0, 0x4f, 0x82, 0x94, 0x73, 0xfd, 0xfc, 0x5b, 0x99, 0x4b, 0xec, 0xef, 0x00, 0x1f, 0x77, 0xc6, 0x77, 0x62, 0x73, 0x00, 0xf6, 0x1e, 0xb0, 0xd7, 0x3e, 0xa1};
const BOOL isDEMO = NO;

- (IBAction)resetBtnPressed:(id)sender {
    [_spinner stopAnimating];
    [UIView animateWithDuration:1. delay:0. options:0 animations:^{
        [_bgView setFrame:CGRectMake(0, 0, _bgView.frame.size.width, _bgView.frame.size.height)];
    } completion:^(BOOL finished) {
        self.textLbl.text = @"";
        self.videoArr = nil;
        [self.tblView reloadData];
        if (transactionState == TS_INITIAL) {
            [self.view.layer insertSublayer:multiLayer atIndex:0];
            voiceSearch = [[SKRecognizer alloc] initWithType:SKDictationRecognizerType
                                               detection:SKShortEndOfSpeechDetection
                                                language:@"en_US"
                                                delegate:self];
        }
    }];
    
    
    
    if (transactionState == TS_RECORDING) {
        [voiceSearch stopRecording];
        transactionState = TS_IDLE;
        [multiLayer removeFromSuperlayer];
    }
    else if (transactionState == TS_IDLE) {
        
        transactionState = TS_INITIAL;
        
        /* Nuance can also create a custom recognition type optimized for your application if neither search nor dictation are appropriate. */
    }
}

-(void)instantiateTestData{
    self.videoArr = @[@{@"title": @"How Much Water Do We Really Need to Drink?", @"videoID": @"E7NvSjawuiw", @"imgURL": @"http://i.ytimg.com/vi/E7NvSjawuiw/default.jpg"}, @{@"title": @"How Much Water Do you Drink Each Day?", @"videoID": @"1YvxbJFHJtU", @"imgURL": @"http://i.ytimg.com/vi/1YvxbJFHJtU/default.jpg"}, @{@"title": @"How Much Water Should I Drink A Day - Daily Water Intake", @"videoID": @"hWb9vVzxUJw", @"imgURL": @"http://i.ytimg.com/vi/hWb9vVzxUJw/default.jpg"}, @{@"title": @"Drink WATER! It Works Wonders!", @"videoID": @"B5vfaydkxSI", @"imgURL": @"http://i.ytimg.com/vi/B5vfaydkxSI/default.jpg"}, @{@"title": @"Woman Finds Fountain of Youth By Drinking 6 Bottles of Water a Day", @"videoID": @"RD6dbwXdeh4", @"imgURL": @"http://i.ytimg.com/vi/RD6dbwXdeh4/default.jpg"}];
    [self.tblView reloadData];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    
    multiLayer = [[MultiplePulsingHaloLayer alloc] initWithHaloLayerNum:4 andStartInterval:1];
    multiLayer.position = CGPointMake(self.view.center.x, self.view.center.y-80);
    [multiLayer buildSublayers];
    [multiLayer setHaloLayerColor:[UIColor blueColor].CGColor];
    [multiLayer setRadius:150.f];
    
    
    [SpeechKit setupWithID:@"NMDPTRIAL_ShadyElyaski20141118084451"
                      host:@"sslsandbox.nmdp.nuancemobility.net"
                      port:443
                    useSSL:YES
                  delegate:nil];
    
    // Set earcons to play
    SKEarcon* earconStart	= [SKEarcon earconWithName:@"earcon_listening.wav"];
    SKEarcon* earconStop	= [SKEarcon earconWithName:@"earcon_done_listening.wav"];
    SKEarcon* earconCancel	= [SKEarcon earconWithName:@"earcon_cancel.wav"];
    
    [SpeechKit setEarcon:earconStart forType:SKStartRecordingEarconType];
    [SpeechKit setEarcon:earconStop forType:SKStopRecordingEarconType];
    [SpeechKit setEarcon:earconCancel forType:SKCancelRecordingEarconType];
}

-(void)viewDidAppear:(BOOL)animated{
    [super viewDidAppear:animated];
    
    if (!isFirstTime) {
        [self resetBtnPressed:nil];
        isFirstTime = YES;
    }
    
    [_bgView setFrame:CGRectMake(0, self.textLbl.text.length?-350:0, _bgView.frame.size.width, _bgView.frame.size.height)];
}

-(void)gotASentence:(NSString *)sentence{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_LOW, 0),
                   ^{
                       [self animateLabelShowText:sentence characterDelay:0.5];
                   });
}

- (void)animateLabelShowText:(NSString*)newText characterDelay:(NSTimeInterval)delay
{
    [self.textLbl setText:@""];
    
    NSArray *wordsArr = [newText componentsSeparatedByString:@" "];
    
    for (int i=0; i<wordsArr.count; i++)
    {
        dispatch_async(dispatch_get_main_queue(),
                       ^{
                           [self.textLbl setText:[NSString stringWithFormat:@"%@ %@", self.textLbl.text, wordsArr[i]]];
                       });
        
        [NSThread sleepForTimeInterval:delay];
    }
    
    dispatch_async(dispatch_get_main_queue(),
                   ^{
                       [self animationDone];
                   });
}

-(void)viewWillAppear:(BOOL)animated{
    [super viewWillAppear:animated];
    
}

-(void)animationDone{
    [UIView animateWithDuration:1. delay:1. options:0 animations:^{
        [_bgView setFrame:CGRectMake(0, -350, _bgView.frame.size.width, _bgView.frame.size.height)];
    } completion:^(BOOL finished) {
        [_spinner startAnimating];
        [self performSelector:@selector(loadFromAPI) withObject:nil afterDelay:isDEMO?2.:0.];
    }];
}

-(void)loadFromAPI{
    if (isDEMO) {
        [self errorHandler];
    }else{
        __weak ASIHTTPRequest *request = [ASIHTTPRequest requestWithURL:[NSURL URLWithString:[[NSString stringWithFormat:@"https://gdata.youtube.com/feeds/api/videos?q=%@&orderby=relevance&max-results=20&v=2&alt=json", [self.textLbl.text stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]]] stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]]];
        [request setCompletionBlock:^{
            [_spinner stopAnimating];
            NSError *error = nil;
            NSMutableArray *arr = [NSMutableArray array];
            NSArray *resultsArr = [NSJSONSerialization JSONObjectWithData:request.responseData options:kNilOptions error:&error][@"feed"][@"entry"];
            
            for (NSDictionary *dic in resultsArr) {
                [arr addObject:@{@"title": dic[@"title"][@"$t"], @"videoID": dic[@"media$group"][@"yt$videoid"][@"$t"], @"imgURL": [dic[@"media$group"][@"media$thumbnail"] lastObject][@"url"]}];
            }
            
            self.videoArr = arr;
            if (error) {
                [self errorHandler];
            }else{
                [self.tblView reloadData];
            }
        }];
        [request setFailedBlock:^{
            [_spinner stopAnimating];
            [self errorHandler];
        }];
        [request startAsynchronous];
    }
}

-(void)errorHandler{
//    [self resetBtnPressed:nil];
    [self instantiateTestData];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark -
#pragma mark SKRecognizerDelegate methods

- (void)recognizerDidBeginRecording:(SKRecognizer *)recognizer
{
    NSLog(@"Recording started.");
    
    transactionState = TS_RECORDING;
}

- (void)recognizerDidFinishRecording:(SKRecognizer *)recognizer
{
    NSLog(@"Recording finished.");

    transactionState = TS_PROCESSING;
}

- (void)recognizer:(SKRecognizer *)recognizer didFinishWithResults:(SKRecognition *)results
{
    NSLog(@"Got results.");
    NSLog(@"Session id [%@].", [SpeechKit sessionID]); // for debugging purpose: printing out the speechkit session id
    
    NSString *search = results.results.firstObject;
    if (search.length) {
        [self gotASentence:results.results.firstObject];
        
        voiceSearch = nil;
        
        [multiLayer removeFromSuperlayer];
    }else{
        if (transactionState != TS_IDLE) {
            [self resetBtnPressed:nil];
        }
    }
    
    transactionState = TS_IDLE;
}

- (void)recognizer:(SKRecognizer *)recognizer didFinishWithError:(NSError *)error suggestion:(NSString *)suggestion
{
    NSLog(@"Got error.");
    NSLog(@"Session id [%@].", [SpeechKit sessionID]); // for debugging purpose: printing out the speechkit session id
    
    transactionState = TS_IDLE;
    
    [[[UIAlertView alloc] initWithTitle:@"Error"
                                                    message:[error localizedDescription]
                                                   delegate:nil
                                          cancelButtonTitle:@"OK"
                                          otherButtonTitles:nil] show];
    
    voiceSearch = nil;
    
    [multiLayer removeFromSuperlayer];
}

#pragma mark -
#pragma mark UITableView methods

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
    return videoArr.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    static NSString *cellIdentifier = @"Cell1";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellIdentifier forIndexPath:indexPath];
    
    UIImageView *imgVu = (UIImageView *)[cell.contentView viewWithTag:1100];
    UILabel *lbl = (UILabel *)[cell.contentView viewWithTag:11];
    
    NSDictionary *videoItem = videoArr[indexPath.row];
    
    [lbl setText:videoItem[@"title"]];
    [imgVu sd_setImageWithURL:[NSURL URLWithString:videoItem[@"imgURL"]]];
    
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath{
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    YoutubePlayerViewController *player = [self.storyboard instantiateViewControllerWithIdentifier:@"YoutubePlayerViewController"];
    [self presentViewController:player animated:YES completion:^{
        NSDictionary *videoItem = videoArr[indexPath.row];
        NSString *youTubeVideoHTML = @"<html><head><style>body{margin:0px 0px 0px 0px;}</style></head> <body> <div id=\"player\"></div> <script> var tag = document.createElement('script'); tag.src = 'http://www.youtube.com/player_api'; var firstScriptTag = document.getElementsByTagName('script')[0]; firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); var player; function onYouTubePlayerAPIReady() { player = new YT.Player('player', { width:'768', height:'1024', videoId:'%@', events: { 'onReady': onPlayerReady } }); } function onPlayerReady(event) { event.target.playVideo(); } </script> </body> </html>";
        
        NSString *html = [NSString stringWithFormat:youTubeVideoHTML, videoItem[@"videoID"]];
        
        player.webView.mediaPlaybackRequiresUserAction = NO;
        
        [player.webView loadHTMLString:html baseURL:[[NSBundle mainBundle] resourceURL]];
    }];
}

@end
